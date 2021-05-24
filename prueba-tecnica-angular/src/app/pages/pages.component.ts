import { Component, OnInit } from '@angular/core';
import { TareasService } from "../shared/api/tareas.service";
import { UtilitiesService } from "../shared/api/utilities.service";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {
  
  tareas_collection: any = [];
  tareas_collection_original: any = [];
  nueva_tarea: any = {};
  input_search: any = '';
  current_page: number = 0;
  num_items_page: number = 5;

  constructor(
    public tareasService: TareasService, 
    public utilitiesService: UtilitiesService) { }

  ngOnInit() {
    this.fnGetTareas();
  }

  fnGetTareas() {
    const self = this;
    self.tareasService.fnHttpGetTareas().subscribe(r => {
      if (r.status == 200) {
        self.tareas_collection = JSON.parse(JSON.stringify(r.body));
        self.tareas_collection_original = JSON.parse(JSON.stringify(r.body));
      }
    });
  }

  fnCrearTarea(nueva_tarea) {
    const self = this;
    self.tareasService.fnHttpCrearTarea(nueva_tarea).subscribe(r => {
      if (r.status == 201) {
        self.nueva_tarea = {};
        self.fnGetTareas();
      }
      if (r.status == 206) {
        self.nueva_tarea = {};
      }
    }, err => {
      if (err.status == 500) {
        self.nueva_tarea = {};
      }
      if (err.status == 409) {
        self.nueva_tarea = {};
      }
    });
  }

  fnActualizarTarea(objeto_tarea) {
    const self = this;
    self.tareasService.fnHttpActualizarTarea(objeto_tarea).subscribe(r => {
      if (r.status == 200) {
        self.fnGetTareas();
      }
      if (r.status == 206) {
      }
    }, err => {
      if (err.status == 500) {
      }
      if (err.status == 409) {
      }
    });
  }

  fnEliiminarTarea(objeto_tarea) {
    const self = this;
    self.tareasService.fnHttpEliminarTarea(objeto_tarea).subscribe(r => {
      if (r.status == 200) {
        self.fnGetTareas();
      }
      if (r.status == 206) {
      }
    }, err => {
      if (err.status == 500) {
      }
      if (err.status == 409) {
      }
    });
  }

  
  fnFilter(projects, text_typing) {
    const self = this;
    const toSearch = text_typing.toLowerCase();
    if (toSearch) {
      let tareas_collection_original = JSON.parse(JSON.stringify(self.tareas_collection_original));
      self.utilitiesService.fnSearchTest(tareas_collection_original, toSearch, function (data_collection) {
        self.tareas_collection = data_collection;
      });
    } else {
      self.tareas_collection = JSON.parse(JSON.stringify(self.tareas_collection_original));
    }
  }

}
