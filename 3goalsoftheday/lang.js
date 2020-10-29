i18nextko.init(
  {
    en: {
      translation: {
        choiceLang: "Language",
        placeholder: "Enter your goal",
        submitBtn: "Add Goal",
        cardHeader: "Your goals today",
        nogoal: "You do not have a goal yet.",
        startCounter: "Start Counter",
        stopCounter: "Stop Counter",
        stoppedCounter: "You Stopped Your Goal!",
        startedCounter: "The last <b>{{s}} hours {{dk}} mins {{sn}} secs</b> left to your goals",
        RefreshForNewGoals: "Add New Goals",

        title: "i18next-ko Example",
        text: "This is an example for i18next-ko. Please select a language:",
        greet: "Hello, {{name}}!",
        dummyButton: "Pointless button",
        dummyButtonFor: "Your very own pointless button, {{name}}!",
        dummySpan: "Your very own pointless <span>",
        translatedVariable: "This is a computed observable, that is updated on language changes.",
      },
    },
    tr: {
      translation: {
        choiceLang: "Dil Seçiniz",
        placeholder: "Hedefinizi girin",
        submitBtn: "Hedef Ekle",
        cardHeader: "Bugünkü Hedefleriniz",
        nogoal: "Henüz bir hedefiniz bulunmamaktadır.",
        startCounter: "Sayacı Başlat",
        stopCounter: "Sayacı Durdur",
        stoppedCounter: "Hedefinizi Durdurdunuz!",
        startedCounter: "Hedefinize kalan son <b>{{s}} saat {{dk}} dk {{sn}} sn</b>",
        RefreshForNewGoals: "Yeni Hedefler Ekle",

        title: "<h3>i18next-ko Beispiel</h3>",
        text: "Dies ist ein Beispiel für i18next-ko. Wählen Sie eine Sprache:",
        greet: "Hallo, {{name}}!",
        dummyButton: "Sinnloser Knopf",
        dummyButtonFor: "Dein ganz persönlicher sinnloser Knopf, {{name}}!",
        translatedVariable: "Dies ist ein computed observable, der sich beim Sprachwechsel aktualisiert.",
      },
    },
  },
  localStorage.getItem("lang"),
  ko
);
