"use client";
import profile from "@/data/profile.json";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Sparkles } from "lucide-react";

interface AboutProps {
  onConnectClick: () => void;
}

export default function About({ onConnectClick }: AboutProps) {
  return (
    <section className="py-12">
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building innovative solutions with modern technology and a passion for continuous learning.
          </p>
        </div>

        {/* Avatar and Name Section */}
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-48 h-48 lg:w-56 lg:h-56 shadow-xl ring-4 ring-background">
            <AvatarImage src="/moi.jpg" alt={profile.name} />
            <AvatarFallback className="text-3xl">{profile.name[0]}</AvatarFallback>
          </Avatar>

          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">{profile.name}</h1>
            <Badge variant="secondary" className="mt-2 gap-1">
              <Sparkles className="w-3 h-3" />
              {profile.status}
            </Badge>
          </div>
        </div>

        {/* Bio */}
        <Card className="border-muted">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line text-center">
              {profile.summary}
            </p>
          </CardContent>
        </Card>

        {/* Currently Learning */}
        <Card className="bg-muted/30 border-muted">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <span className="relative flex h-3 w-3 mt-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-medium mb-2">Currently Exploring</p>
                <p className="text-sm text-muted-foreground">
                  Sveltekit for full-stack development, and algorithm development for recommendations based off user history.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Let's Connect Button - Prominent CTA */}
        <div className="text-center pt-4">
          <Button
            onClick={onConnectClick}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Let's Connect
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Ready to collaborate? Let's discuss opportunities!
          </p>
        </div>
      </div>
    </section>
  );
}
