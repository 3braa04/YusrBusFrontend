import TicketReportApiService from "@/app/core/networking/services/reports/ticketReportApiService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2, Ticket } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function TicketRedirect() {
  const { accessKey } = useParams<{ accessKey: string }>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const redirectToTicket = async () => {
      if (!accessKey) return;

      try {
        const response = await TicketReportApiService.getReportUrl(accessKey);
        
        if (response.status === 200 && response.data) {
          const finalUrl = typeof response.data === 'string' 
                           ? response.data 
                           : (response.data as any).url;
          
          window.location.replace(finalUrl);
        } else {
          setError(response.errorTitle || "عذراً، لم نتمكن من العثور على هذه التذكرة.");
        }
      } catch (err) {
        console.error("Redirect Error:", err);
        setError("حدث خطأ تقني أثناء محاولة جلب التذكرة. يرجى المحاولة لاحقاً.");
      }
    };

    redirectToTicket();
  }, [accessKey]);

  return (
    <div className="flex min-h-screen items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-md border-t-4 border-t-primary shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Ticket className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl font-bold">بوابة تذاكر يسر</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 py-6 text-center">
          {!error ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <div className="space-y-1">
                <p className="text-lg font-medium text-slate-700 dark:text-slate-200">
                  جاري تجهيز تذكرتكم...
                </p>
                <p className="text-sm text-muted-foreground">
                  سيتم تحويلكم تلقائياً إلى ملف التذكرة (PDF)
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Alert variant="destructive" className="text-right">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>خطأ في التحميل</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => window.location.reload()}
              >
                إعادة المحاولة
              </Button>
            </div>
          )}
        </CardContent>
        
        <div className="border-t p-4 text-center text-[10px] text-muted-foreground uppercase tracking-widest">
          Yusr Bus | حافلات يُسر
        </div>
      </Card>
    </div>
  );
}