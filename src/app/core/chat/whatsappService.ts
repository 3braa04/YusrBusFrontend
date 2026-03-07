export default class WhatsappService
{
    static CreateUrl(header: string, body: string, footer: string, toPhone: string): string {

        let cleanPhone = toPhone.replace(/\D/g, "");
        
        if (cleanPhone.startsWith("05") && cleanPhone.length === 10) {
            cleanPhone = "966" + cleanPhone.substring(1);
        }

        const fullMessage = 
            `*${header}*\n\n` + 
            `${body}\n\n` + 
            `_${footer}_`;

        return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullMessage)}`;
    }

    static SendMessage(header: string, body: string, footer: string, toPhone: string) {
        const url = this.CreateUrl(header, body, footer, toPhone);
        window.open(url, "_blank");
    }
}