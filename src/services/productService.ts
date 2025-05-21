import type { Project } from '@/schema/project-schema'
import http from '@/utils/http'

export async function getProjectList() {
  return http
    .get('/projects')
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}

export async function getProjectById(id: string) {
  return http
    .get(`/projects/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}

export async function postProject(project: Project) {
  return http
    .post('/projects', project)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}

export async function putProject(project: Project) {
  return http
    .put(`/projects/${project.id}`, project)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}

export async function deleteProject(id: string) {
  return http
    .delete(`/projects/${id}`)
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      throw error
    })
}
