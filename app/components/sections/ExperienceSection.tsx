import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { experiences } from "@/data/profile";
import type { Experience } from "@/types";
import { Building } from "lucide-react";

interface ExperienceCardProps {
  experience: Experience;
}

function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="relative flex items-start gap-4 md:gap-6">
      {/* Timeline Dot */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-8 h-8 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
          <Building className="h-4 w-4 md:h-8 md:w-8 text-white" />
        </div>
      </div>

      {/* Content Card */}
      <div className="flex-1 min-w-0">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {experience.position}
                </h3>
                <p className="text-blue-600 font-semibold text-lg">
                  {experience.company}
                </p>
              </div>
              <Badge
                variant="outline"
                className="text-sm font-medium px-3 py-1"
              >
                {experience.period}
              </Badge>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
              {experience.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {experience.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section id="flight-log" className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Flight Log</h2>
          <p className="text-gray-600">経歴・職歴</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-blue-200" />

            <div className="space-y-8">
              {experiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}