import { defineStore } from 'pinia'
import type { Project } from '@/schema/project-schema'

export const useProjectStore = defineStore('project', {
  state: () => ({
    project: {} as Project,
    projectList: [] as Project[],
  }),
  getters: {
    getProjectById: (state) => {
      return (id: string): Project | undefined => {
        return state.projectList.find((p) => p.id === id)
      }
    },
  },
  actions: {
    setProjectFavorite(projectId: string, isFavorite: boolean) {
      const index = this.projectList.findIndex((p) => p.id === projectId)
      this.projectList[index].isFavorite = isFavorite
    },
    setProjectList(projectList: Project[]) {
      this.projectList = projectList
    },
    addProject(project: Project) {
      this.projectList.push({ ...project })
    },
    deleteProject(projectId: string) {
      const index = this.projectList.findIndex((p) => p.id === projectId)
      if (index !== -1) {
        this.projectList.splice(index, 1)
      }
    },
    updateProject(updatedProject: Project) {
      const index = this.projectList.findIndex((p) => p.id === updatedProject.id)
      if (index !== -1) {
        this.projectList[index] = updatedProject
      }
    },
  },
})
