import { Button } from "@/components/ui/button";
import { Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router";

export function ContactSection() {
  return (
    <section id="contact" className="py-16 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready for Takeoff
          </h2>
          <p className="text-gray-600 mb-8">
            新しいプロジェクトやチームでの挑戦をお待ちしています。
            お気軽にお声がけください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Mail className="h-4 w-4 mr-2" />
              Contact YJN279
            </Button>
            <Link to="/profile">
              <Button variant="outline" size="lg">
                <MessageCircle className="h-4 w-4 mr-2" />
                プロフィールを見る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}