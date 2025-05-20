import { defineStore } from 'pinia'
import type { Project } from '@/schema/project-schema'

export const useProjectStore = defineStore('project', {
  state: () => ({
    project: {} as Project,
    projectList: [] as Project[],
    filteredProjectList: [] as Project[],
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
    addProject(project: Project) {
      this.projectList.push({ ...project })
    },
    filterByFavorites() {
      this.filteredProjectList = this.projectList.filter((p) => p.isFavorite)
    },
    sortByStartDate() {
      this.projectList.sort(
        (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      )
      this.filteredProjectList = this.projectList
    },
    sortByEndDate() {
      this.projectList.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
      this.filteredProjectList = this.projectList
    },
    sortByAlphabeticalOrder() {
      this.projectList.sort((a, b) => a.name.localeCompare(b.name))
      this.filteredProjectList = this.projectList
    },
    resetFilter() {
      this.filteredProjectList = this.projectList
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
