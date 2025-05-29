import { Plane } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-white py-8 px-4">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-gray-900">Flight YJN279</span>
        </div>
        <p className="text-gray-600 text-sm">
          © 2025 YJN279 All rights reserved.
        </p>
      </div>
    </footer>
  );
}