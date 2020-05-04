export default function normalizeDate(utcDate = new Date().toISOString()) {
    const daysOfWeek = [ 'domingo',
        'segunda-feira',
        'terça-feira',
        'quarta-feira',
        'quinta-feira',
        'sexta-feira',
        'sábado' ];
    const date = new Date(utcDate);
    const now = new Date();
    const dateYearMonth = date.toISOString().substr(0, 7);
    const nowYearMonth = now.toISOString().substr(0, 7);
    const hour = addZero(date.getHours());
    const minutes = addZero(date.getMinutes());
    if (dateYearMonth === nowYearMonth) {
        if (date.getDate() === now.getDate()) return `hoje às ${hour}:${minutes}`;
        if (now.getDate() - date.getDate() === 1) return `ontem às ${hour}:${minutes}`;
        if (now.getDate() - date.getDate() === -1) return `amanhã às ${hour}:${minutes}`;
    }
    const weekDay = daysOfWeek[ date.getDay() ];
    const day = date.getDate();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const year = date.getFullYear();
    return `${weekDay}, ${day}/${month}/${year} às ${hour}:${minutes}`;

    function addZero(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }
}