import { defineStore } from 'pinia'
import type { Project } from '@/schema/project-schema'
import {
  postProject,
  putProject,
  getProjectById,
  getProjectList,
  deleteProject,
} from '@/services/productService'

export const useProjectStore = defineStore('project', {
  state: () => ({
    project: {} as Project,
    projectList: [] as Project[],
    filteredProjectList: [] as Project[],
  }),
  actions: {
    async setProjectFavorite(projectId: string, isFavorite: boolean) {
      try {
        const index = this.projectList.findIndex((p) => p.id === projectId)
        const project = this.projectList[index]
        project.isFavorite = isFavorite
        await putProject(project)
        this.projectList[index].isFavorite = isFavorite
      } catch (error) {
        console.error('Error updating project favorite status:', error)
      }
    },
    async addProject(project: Project) {
      if (!project.id) {
        project.id = crypto.randomUUID()
        project.isFavorite = false
      }
      try {
        await postProject(project)
        this.projectList.push({ ...project })
        this.project = {} as Project
      } catch (error) {
        console.error('Error adding project:', error)
      }
    },
    async getAllProjects() {
      try {
        const projectList = await getProjectList()
        this.projectList = projectList
        this.resetFilter()
      } catch (error) {
        console.error('Error fetching project by ID:', error)
      }
    },
    async getProjectById(id: string) {
      try {
        const project = await getProjectById(id)
        this.project = project
      } catch (error) {
        console.error('Error fetching project by ID:', error)
      }
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
    async deleteProject(projectId: string) {
      try {
        const index = this.projectList.findIndex((p) => p.id === projectId)
        if (index !== -1) {
          await deleteProject(projectId)
          this.projectList.splice(index, 1)
          this.project = {} as Project
        }
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    },
    async updateProject(updatedProject: Project) {
      try {
        const index = this.projectList.findIndex((p) => p.id === updatedProject.id)
        if (index !== -1) {
          await putProject(updatedProject)
          this.projectList[index] = updatedProject
        }
      } catch (error) {
        console.error('Error updating project:', error)
      }
    },
    searchProjects(searchValue: string) {
      if (!searchValue.trim()) {
        this.filteredProjectList = this.projectList
        return
      }

      const searchTerm = searchValue.toLowerCase()
      this.filteredProjectList = this.projectList.filter((project) =>
        project.name.toLowerCase().includes(searchTerm),
      )
    },
  },
})
