import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {TranslationService} from './modules/i18n';
// language list
import {locale as enLang} from './modules/i18n/vocabs/en';
import {locale as chLang} from './modules/i18n/vocabs/ch';
import {locale as esLang} from './modules/i18n/vocabs/es';
import {locale as jpLang} from './modules/i18n/vocabs/jp';
import {locale as deLang} from './modules/i18n/vocabs/de';
import {locale as frLang} from './modules/i18n/vocabs/fr';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private translationService: TranslationService,
              private primengConfig: PrimeNGConfig) {
    // register translations
    this.translationService.loadTranslations(
        esLang,
        enLang,
        chLang,
        jpLang,
        deLang,
        frLang
    );
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.primengConfig.setTranslation({
      accept: 'Aceptar',
      reject: 'Cancelar',
      startsWith: "Comienza con",
      contains: "Contiene",
      notContains: "No contiene",
      endsWith: "Termina en",
      equals: "Igual",
      notEquals: "Des igual",
      noFilter: "Sin Filtro",
      lt: "Menos que",
      lte: "Menor o igual que",
      gt: "Mayor que",
      gte: "Mayor o igual que",
      is: "Es",
      isNot: "No es",
      before: "Antes",
      after: "Despues",
      dateIs: "La fecha es",
      dateIsNot: "La fecha no es",
      dateBefore: "La fecha es anterior",
      dateAfter: "La fecha es posterior a",
      clear: "Borrar",
      apply: "Aplicar",
      matchAll: "Coincidir con todos",
      matchAny: "Coincidir con Cualquiera",
      addRule: "Agregar Regla",
      removeRule: "Eliminar Regla",
      choose: "Escoger",
      upload: "Subir",
      cancel: "Cancelar",
      dayNames: ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
      dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      dayNamesMin: ["Do","Lu","Ma","Mi","Ju","Vi","Sa"],
      monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],
      monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      dateFormat: "mm/dd/yy",
      firstDayOfWeek: 0,
      today: "Hoy",
      weekHeader: "Semana",
      weak: 'Débil',
      medium: 'Medio',
      strong: 'Fuerte',
      passwordPrompt: 'Ingrese la contraseña',
      emptyMessage: 'No se Encontraron Resultados',
      emptyFilterMessage: 'No se Encontraron Resultados'
    });
  }
}
