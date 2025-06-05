import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  certifications,
  education,
  experiences,
  interests,
  skills,
} from "@/data/profile";
import {
  ArrowLeft,
  Award,
  Building,
  Calendar,
  Camera,
  Code,
  Coffee,
  Github,
  Globe,
  GraduationCap,
  Heart,
  Linkedin,
  Mail,
  MapPin,
  Music,
  Plane,
  Twitter,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/profile";

export function meta(_: Route.MetaArgs) {
  return [
    { title: "Profile - Flight YJN279" },
    {
      name: "description",
      content:
        "YJN279のプロフィールと経歴詳細。フルスタックWebエンジニアとしての経験、スキル、学歴、趣味などを詳しくご紹介します。",
    },
  ];
}

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Plane className="h-4 w-4" />
                Captain Profile
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                NAKAMURA Yuji
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                フルスタックWebエンジニアとして5年の経験を持ち、
                モダンな技術スタックでユーザー体験を向上させるプロダクト開発に取り組んでいます。
              </p>
            </div>

            {/* Profile Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
              <div className="bg-gradient-to-br from-blue-50 to-sky-50 p-6 md:p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg md:text-2xl">
                      YJ
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                      YJN279
                    </h3>
                    <p className="text-gray-600">Full Stack Web Engineer</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">東京, 日本</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">5年の開発経験</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-700">
                      日本語 (ネイティブ), 英語 (ビジネスレベル)
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    SNS & Links
                  </h4>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/yjn279"
                      className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <Github className="h-6 w-6" />
                    </a>
                    <a
                      href="https://twitter.com/yjn279"
                      className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                    <a
                      href="https://linkedin.com/in/yjn279"
                      className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a
                      href="mailto:yjn279@example.com"
                      className="p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      <Mail className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    About Me
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    東京工業大学情報工学科を卒業後、Web開発の世界に飛び込みました。
                    ユーザー中心の設計思想を大切にし、技術的な課題解決だけでなく、
                    ビジネス価値の創出にも注力しています。
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-3">
                    現在はテックスタートアップでシニアエンジニアとして、
                    新規プロダクトの開発をリードしています。
                    チームワークを重視し、知識共有と継続的な学習を心がけています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-600" />
                    Frontend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.frontend.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-blue-100 text-blue-800"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-green-600" />
                    Backend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-600" />
                    Database
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.database.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-purple-100 text-purple-800"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="h-5 w-5 text-orange-600" />
                    Cloud & DevOps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.cloud.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-orange-100 text-orange-800"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-red-600" />
                    Tools
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-red-100 text-red-800"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Work Experience
            </h2>

            <div className="relative">
              <div className="absolute left-4 md:left-8 top-0 bottom-0 w-0.5 bg-blue-200" />

              <div className="space-y-12">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="relative flex items-start gap-4 md:gap-6"
                  >
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-8 h-8 md:w-16 md:h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                        <Building className="h-4 w-4 md:h-8 md:w-8 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <Card className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {exp.position}
                              </h3>
                              <p className="text-blue-600 font-semibold text-lg">
                                {exp.company}
                              </p>
                              <p className="text-gray-500 text-sm">
                                {exp.location}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-sm font-medium px-3 py-1"
                            >
                              {exp.period}
                            </Badge>
                          </div>

                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {exp.description}
                          </p>

                          <div className="mb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">
                              主な成果・実績
                            </h4>
                            <ul className="space-y-1">
                              {exp.achievements?.map((achievement, i) => (
                                <li
                                  key={`${exp.id}-achievement-${i}`}
                                  className="text-gray-600 text-sm flex items-start gap-2"
                                >
                                  <span className="text-blue-600 mt-1">•</span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Education */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Education
                </h2>
                {education.map((edu) => (
                  <Card key={edu.id} className="mb-6">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <GraduationCap className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900">
                            {edu.degree}
                          </h3>
                          <p className="text-blue-600 font-semibold">
                            {edu.school}
                          </p>
                          <p className="text-gray-500 text-sm mb-3">
                            {edu.period}
                          </p>
                          <p className="text-gray-600 mb-3">
                            {edu.description}
                          </p>
                          <ul className="space-y-1">
                            {edu.achievements.map((achievement, i) => (
                              <li
                                key={`${edu.id}-achievement-${i}`}
                                className="text-gray-600 text-sm flex items-start gap-2"
                              >
                                <span className="text-blue-600 mt-1">•</span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Certifications */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Certifications
                </h2>
                <div className="space-y-4">
                  {certifications.map((cert) => (
                    <Card key={cert.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="p-3 bg-green-100 rounded-lg">
                            <Award className="h-6 w-6 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900">
                              {cert.name}
                            </h3>
                            <p className="text-green-600 font-semibold">
                              {cert.issuer}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <p className="text-gray-500 text-sm">
                                {cert.date}
                              </p>
                              <p className="text-gray-400 text-xs">
                                ID: {cert.credentialId}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Interests & Hobbies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interests.map((interest) => (
                <Card
                  key={interest.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gray-100 rounded-lg">
                        <interest.icon className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {interest.name}
                        </h3>
                        <p className="text-gray-600">{interest.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Let's Connect
            </h2>
            <p className="text-gray-600 mb-8">
              新しいプロジェクトやコラボレーションの機会をお待ちしています。
              お気軽にお声がけください。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <Mail className="h-4 w-4 mr-2" />
                Contact YJN279
              </Button>
              <Link to="/">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
