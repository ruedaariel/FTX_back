"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformarFecha = transformarFecha;
exports.sumaMes = sumaMes;
exports.normalizarDateA0 = normalizarDateA0;
exports.isPagoVigente = isPagoVigente;
exports.calcularFechaVencimiento = calcularFechaVencimiento;
exports.toLocalDateOnly = toLocalDateOnly;
exports.formatToDdMmYy = formatToDdMmYy;
exports.transforma_a_DDMMYY = transforma_a_DDMMYY;
function transformarFecha(fecha) {
    const fechaValida = new Date(fecha);
    if (!isNaN(fechaValida.getTime())) {
        return fechaValida;
    }
    return null;
}
function sumaMes(date, months) {
    const d = new Date(date.getTime());
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth();
    const day = d.getUTCDate();
    const hour = d.getUTCHours();
    const minute = d.getUTCMinutes();
    const second = d.getUTCSeconds();
    const millisecond = d.getUTCMilliseconds();
    const target = new Date(Date.UTC(year, month + months, day, hour, minute, second, millisecond));
    return target;
}
function normalizarDateA0(date) {
    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
}
function isPagoVigente(fechaPago) {
    const hoy = new Date();
    const expira = sumaMes(fechaPago, 1);
    return { activo: hoy.getTime() < expira.getTime(), expira };
}
function calcularFechaVencimiento(fechaPago, fechaPagoEsDateOnly = false) {
    const base = fechaPagoEsDateOnly ? normalizarDateA0(fechaPago) : new Date(fechaPago.getTime());
    const fechaVencimiento = sumaMes(base, 1);
    return fechaVencimiento;
}
function toLocalDateOnly(d) {
    const dt = new Date(d);
    dt.setHours(0, 0, 0, 0);
    return dt;
}
function pad2(n) { return n < 10 ? `0${n}` : `${n}`; }
function formatToDdMmYy(value) {
    if (value == null)
        return null;
    if (typeof value === 'string') {
        if (/^\d{4}[-/]\d{2}[-/]\d{2}$/.test(value)) {
            const parts = value.includes('/') ? value.split('/') : value.split('-');
            const [yyyy, mm, dd] = parts;
            const yy = yyyy.slice(-2);
            return `${dd}/${mm}/${yy}`;
        }
        else {
            return value;
        }
    }
    if (value instanceof Date && !isNaN(value.getTime())) {
        const dd = pad2(value.getUTCDate());
        const mm = pad2(value.getUTCMonth() + 1);
        const yy = String(value.getUTCFullYear()).slice(-2);
        return `${dd}/${mm}/${yy}`;
    }
    if (typeof value === 'number' && Number.isFinite(value)) {
        const d = new Date(value);
        if (!isNaN(d.getTime())) {
            const dd = pad2(d.getUTCDate());
            const mm = pad2(d.getUTCMonth() + 1);
            const yy = String(d.getUTCFullYear()).slice(-2);
            return `${dd}/${mm}/${yy}`;
        }
        return null;
    }
    if (typeof value === 'string') {
        const d = new Date(value);
        if (!isNaN(d.getTime())) {
            const dd = pad2(d.getUTCDate());
            const mm = pad2(d.getUTCMonth() + 1);
            const yy = String(d.getUTCFullYear()).slice(-2);
            return `${dd}/${mm}/${yy}`;
        }
        return null;
    }
    return null;
}
function transforma_a_DDMMYY(value) {
    console.log("Valor en transform fecha", value);
    if (value == null)
        return null;
    if (typeof value === 'string') {
        if (/^\d{4}[-/]\d{2}[-/]\d{2}$/.test(value)) {
            const [yyyy, mm, dd] = value.split('-');
            return `${dd}/${mm}/${yyyy}`;
        }
        else {
            return value;
        }
    }
    if (value instanceof Date && !isNaN(value.getTime())) {
        return formatToDdMmYy(value);
    }
    if (typeof value === 'number') {
        const d = new Date(value);
        if (!isNaN(d.getTime()))
            return formatToDdMmYy(d);
    }
    return null;
}
//# sourceMappingURL=transformar-fecha.js.map