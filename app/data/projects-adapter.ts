// import { getDB } from "@/db";
// import { ProjectService } from "@/services/projects";
import type { Project } from "@/types";
import { projects as staticProjects } from "./projects";

export class ProjectsAdapter {
  // private projectService: ProjectService | null = null;

  async getAll(): Promise<Project[]> {
    // if (this.projectService) {
    //   try {
    //     const dbProjects = await this.projectService.getAll();
    //     return dbProjects
    //       .map((p) => this.projectService?.transformToLegacyFormat(p))
    //       .filter((p): p is Project => p !== undefined);
    //   } catch (error) {
    //     console.warn(
    //       "Database query failed, falling back to static data:",
    //       error,
    //     );
    //     return staticProjects;
    //   }
    // }
    return staticProjects;
  }

  async getFeatured(): Promise<Project[]> {
    // if (this.projectService) {
    //   try {
    //     const dbProjects = await this.projectService.getFeatured();
    //     return dbProjects
    //       .map((p) => this.projectService?.transformToLegacyFormat(p))
    //       .filter((p): p is Project => p !== undefined);
    //   } catch (error) {
    //     console.warn(
    //       "Database query failed, falling back to static data:",
    //       error,
    //     );
    //     return staticProjects.filter((p) => p.featured);
    //   }
    // }
    return staticProjects.filter((p) => p.featured);
  }

  async getOther(): Promise<Project[]> {
    // if (this.projectService) {
    //   try {
    //     const dbProjects = await this.projectService.getOther();
    //     return dbProjects
    //       .map((p) => this.projectService?.transformToLegacyFormat(p))
    //       .filter((p): p is Project => p !== undefined);
    //   } catch (error) {
    //     console.warn(
    //       "Database query failed, falling back to static data:",
    //       error,
    //     );
    //     return staticProjects.filter((p) => !p.featured);
    //   }
    // }
    return staticProjects.filter((p) => !p.featured);
  }

  async getById(id: string): Promise<Project | null> {
    // if (this.projectService) {
    //   try {
    //     const dbProject = await this.projectService.getById(
    //       Number.parseInt(id),
    //     );
    //     return dbProject
    //       ? this.projectService.transformToLegacyFormat(dbProject)
    //       : null;
    //   } catch (error) {
    //     console.warn(
    //       "Database query failed, falling back to static data:",
    //       error,
    //     );
    //     return staticProjects.find((p) => p.id === id) || null;
    //   }
    // }
    return staticProjects.find((p) => p.id === id) || null;
  }

  async create(project: Omit<Project, "id">): Promise<Project | null> {
    // if (this.projectService) {
    //   try {
    //     const newProject = this.projectService.transformFromLegacyFormat({
    //       ...project,
    //       id: "", // Will be auto-generated
    //     });
    //     const dbProject = await this.projectService.create(newProject);
    //     return this.projectService.transformToLegacyFormat(dbProject);
    //   } catch (error) {
    //     console.error("Failed to create project:", error);
    //     return null;
    //   }
    // }
    console.warn("Database not available, cannot create project");
    return null;
  }

  async update(id: string, updates: Partial<Project>): Promise<Project | null> {
    // if (this.projectService) {
    //   try {
    //     const dbUpdates = this.projectService.transformFromLegacyFormat({
    //       ...updates,
    //       id,
    //     } as Project);
    //     const dbProject = await this.projectService.update(
    //       Number.parseInt(id),
    //       dbUpdates,
    //     );
    //     return dbProject
    //       ? this.projectService.transformToLegacyFormat(dbProject)
    //       : null;
    //   } catch (error) {
    //     console.error("Failed to update project:", error);
    //     return null;
    //   }
    // }
    console.warn("Database not available, cannot update project");
    return null;
  }

  async delete(id: string): Promise<boolean> {
    // if (this.projectService) {
    //   try {
    //     return await this.projectService.delete(Number.parseInt(id));
    //   } catch (error) {
    //     console.error("Failed to delete project:", error);
    //     return false;
    //   }
    // }
    console.warn("Database not available, cannot delete project");
    return false;
  }

  isUsingDatabase(): boolean {
    // return this.projectService !== null;
    return false;
  }
}

// Export convenience functions that maintain the current API
export async function getProjects(env?: { DB?: D1Database }): Promise<
  Project[]
> {
  const adapter = new ProjectsAdapter();
  return adapter.getAll();
}

export async function getFeaturedProjects(env?: { DB?: D1Database }): Promise<
  Project[]
> {
  const adapter = new ProjectsAdapter();
  return adapter.getFeatured();
}

export async function getOtherProjects(env?: { DB?: D1Database }): Promise<
  Project[]
> {
  const adapter = new ProjectsAdapter();
  return adapter.getOther();
}
