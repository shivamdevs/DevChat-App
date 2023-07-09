export default function getDisplayDate(time, show = false) {
    const today = new Date();
    const sent = new Date(time);
    const dateFrom = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dateTo = new Date(sent.getFullYear(), sent.getMonth(), sent.getDate());
    const diff = dateFrom.getTime() - dateTo.getTime();
    const print = {
        date: `${String(sent.getDate()).padStart(2, "0")}-${String(sent.getMonth() + 1).padStart(2, "0")}-${sent.getFullYear()}`,
        time: `${sent.getHours() % 12 || 12}:${String(sent.getMinutes()).padStart(2, "0")} ${sent.getHours() < 12 ? "am" : "pm"}`,
    };
    if (dateFrom.getTime() === dateTo.getTime()) {
        if (show) return `Today ${print.time}`;
        return print.time;
    } else if (diff <= (24 * 60 * 60 * 1000)) {
        if (show) return `Yesterday ${print.time}`;
        return "Yesterday";
    } else {
        if (show) return `${print.date} ${print.time}`;
        return print.date;
    }
}