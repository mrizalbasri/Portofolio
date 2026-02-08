"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { FaGithub, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import { Project } from "@/types/project";
import Image from "next/image";

interface ThreeDProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ThreeDProjectCard({
  project,
  onClick,
}: ThreeDProjectCardProps) {
  const IconComponent = project.icon;

  return (
    <CardContainer className="inter-var py-0">
      <CardBody
        className="bg-gray-900/80 relative group/card hover:shadow-2xl hover:shadow-cyan-500/[0.15] border-white/[0.1] w-full h-auto rounded-2xl p-6 border cursor-pointer"
        onClick={onClick}
      >
        {/* Project Icon/Badge */}
        <CardItem translateZ="50" className="flex items-center gap-3">
          <div
            className={`p-2 rounded-lg bg-gradient-to-r ${project.gradient}`}
          >
            <IconComponent className="text-white text-lg" />
          </div>
          <div className="flex items-center gap-2">
            {project.githubStats && project.githubStats.stars > 0 && (
              <span className="flex items-center gap-1 text-yellow-400 text-sm">
                <FaStar className="text-xs" />
                {project.githubStats.stars}
              </span>
            )}
          </div>
        </CardItem>

        {/* Title */}
        <CardItem translateZ="60" className="text-xl font-bold text-white mt-4">
          {project.title}
        </CardItem>

        {/* Description */}
        <CardItem
          as="p"
          translateZ="70"
          className="text-neutral-400 text-sm mt-2 line-clamp-2"
        >
          {project.description}
        </CardItem>

        {/* Image */}
        <CardItem translateZ="100" className="w-full mt-4">
          {project.image ? (
            <div className="relative h-48 w-full rounded-xl overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover/card:shadow-xl transition-transform duration-300 group-hover/card:scale-105"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-20`}
              />
            </div>
          ) : (
            <div
              className={`h-48 w-full rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}
            >
              {/* Animated Pattern */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                  backgroundSize: "24px 24px",
                }}
              />
              <IconComponent className="text-white text-5xl opacity-50" />
            </div>
          )}
        </CardItem>

        {/* Tags */}
        <CardItem translateZ="50" className="flex flex-wrap gap-2 mt-4">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-gray-300"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-1 text-xs text-gray-500">
              +{project.tags.length - 4}
            </span>
          )}
        </CardItem>

        {/* Actions */}
        <div className="flex justify-between items-center mt-6">
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl text-sm font-medium text-white hover:text-cyan-400 transition-colors flex items-center gap-2"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            View Details →
          </CardItem>
          <div className="flex gap-2">
            {project.githubUrl && (
              <CardItem
                translateZ={20}
                as="a"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <FaGithub className="text-lg" />
              </CardItem>
            )}
            {project.demoUrl && project.demoUrl !== "#" && (
              <CardItem
                translateZ={20}
                as="a"
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <FaExternalLinkAlt className="text-sm" />
              </CardItem>
            )}
          </div>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default ThreeDProjectCard;
