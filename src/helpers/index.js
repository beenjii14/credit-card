import async from 'async';
import Swal from 'sweetalert2';

export function validateFilds(fields, callback) {
    async.forEach(fields, (field, next) => {
        if (field === '' || field === undefined || field === null) {
            return callback(false);
        }
        next();
    }, err => {
        if (!err) {
            return callback(true);
        }
    });
}

export function messageAlert({ type, title, text, textButton, timer, html }) {
    Swal.fire({
        icon: type ? type : '',
        title: title ? title : '',
        text: text ? text : '',
        html: html ? html : '',
        confirmButtonText: (textButton) ? textButton : 'Aceptar',
        timer: timer ? timer : 50000
    });
}
