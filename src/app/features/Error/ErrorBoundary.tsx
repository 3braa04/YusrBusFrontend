import React from "react";
import ErrorFallback from "./ErrorFallback";

interface ErrorBoundaryProps {
  children?: React.ReactNode;
  fallback?: React.ReactNode; 
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null; // أضفنا تخزين الخطأ نفسه للمساعدة في التصحيح
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // نحدث الحالة ليظهر الـ UI البديل في الرندر القادم
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {    
    // هنا نقوم بتسجيل الخطأ في الـ Console حالياً (وفي المستقبل لخدمة مثل Sentry)
    console.group("🛑 Yusr Bus - Error Boundary");
    console.error("Error:", error);
    console.error("Error Info:", errorInfo);
    console.groupEnd();
  }

  // دالة لإعادة ضبط حالة الخطأ يدوياً
  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {    
    if (this.state.hasError) {
      // إذا كان هناك fallback مخصص نستخدمه، وإلا نستخدم الـ Fallback الافتراضي تبعنا
      return (
        this.props.fallback || (
          <ErrorFallback 
            reset={this.handleReset} 
            // يمكننا تمرير رسالة الخطأ للـ Fallback إذا أردنا عرض تفاصيل تقنية بسيطة
          />
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;