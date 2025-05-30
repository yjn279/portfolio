import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export function FloatingContactButton() {
  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      <Button
        size="sm"
        className="md:size-lg rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
      >
        <Mail className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
        <span className="hidden sm:inline">Contact YJN279</span>
        <span className="sm:hidden">Contact</span>
      </Button>
    </div>
  );
}
