import Vue from "vue";


Vue.config.errorHandler = (err, vm, info) => {
    $("#app").append(`    <v-snackbar
      bottom
      shaped
      timeout="3000"
    >ERROR:${err}<br>INFO:${info}</v-snackbar>`);
};

window.onerror = function(message, source, lineno, colno, error) {
    $("#app").append(`    <v-snackbar
      bottom
      shaped
      timeout="3000"
    >${message}</v-snackbar>`);
};