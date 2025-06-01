import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { awards } from "@/data/profile";
import type { Award } from "@/types";
import { Trophy, ExternalLink, Calendar, Building } from "lucide-react";

interface AwardCardProps {
  award: Award;
}

function AwardCard({ award }: AwardCardProps) {
  return (
    <div className="relative flex items-start gap-4 md:gap-6">
      {/* Timeline Dot */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-8 h-8 md:w-16 md:h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
          <Trophy className="h-4 w-4 md:h-8 md:w-8 text-white" />
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1 min-w-0">
        <Card className="hover:shadow-md transition-shadow border-l-4 border-l-amber-500">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {award.title}
                </h3>
                <div className="flex items-center gap-2 text-amber-600 font-semibold text-lg mb-2">
                  <Building className="h-4 w-4" />
                  <span>{award.issuer}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{award.date}</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Badge
                  variant="outline"
                  className="text-sm font-medium px-3 py-1 bg-amber-50 border-amber-200"
                >
                  {award.category}
                </Badge>
                {award.achievement && (
                  <Badge
                    variant="default"
                    className="text-sm font-medium px-3 py-1 bg-amber-500"
                  >
                    {award.achievement}
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {award.description}
            </p>

            {award.url && (
              <div className="flex justify-end">
                <a
                  href={award.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
                >
                  詳細を見る
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function AwardsSection() {
  return (
    <section id="trophy-case" className="py-16 px-4 bg-gradient-to-br from-amber-50 via-white to-yellow-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trophy Case</h2>
          <p className="text-gray-600">受賞歴・表彰</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-amber-200" />

            <div className="space-y-8">
              {awards.map((award) => (
                <AwardCard key={award.id} award={award} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}