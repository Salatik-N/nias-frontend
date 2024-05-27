import { flattenAttributes, getHeaders, getStrapiURL } from '@/lib/utils'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const baseUrl = getStrapiURL()

interface StrapiGetRequestParams {
  [key: string]: any
}

interface StrapiPostRequestData {
  [key: string]: any
}

enum contentType {
  json = 'application/json',
  form = 'multipart/form-data',
}

const strapiGetRequest = async <T>(
  url: string,
  params: StrapiGetRequestParams = {},
  token: string | null = null,
  type = contentType.json
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      params,
      headers: getHeaders(token, type),
    }

    const response: AxiosResponse<T> = await axios.get(baseUrl + url, config)
    return flattenAttributes(response.data)
  } catch (error) {
    console.error('Error making GET request to Strapi:', error)
    throw error
  }
}

const strapiPostRequest = async <T>(
  url: string,
  data: StrapiPostRequestData = {},
  token: string | null = null,
  type = contentType.json
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      headers: getHeaders(token, type),
    }

    const response: AxiosResponse<T> = await axios.post(
      baseUrl + url,
      data,
      config
    )
    return response.data
  } catch (error) {
    console.error('Error making POST request to Strapi:', error)
    throw error
  }
}

export async function getGlobalPageData() {
  const url = '/api/global'

  const params = {
    'populate[header][populate][route]': true,
    'populate[header][populate][socialLink]': true,
  }

  return await strapiGetRequest(url, params)
}

export async function getGlobalPageMetadata() {
  const url = '/api/global'

  return await strapiGetRequest(url)
}

export async function getContactPageData() {
  const url = '/api/contact'

  const params = {
    'populate[socialLink]': true,
    'populate[seo_data]': true,
  }

  return await strapiGetRequest(url, params)
}

export async function getAboutPageData() {
  const url = '/api/about'

  const params = {
    'populate[skills][populate][skill]': true,
  }

  return await strapiGetRequest(url, params)
}

export async function getProjectsData() {
  const url = '/api/projects'

  const params = {
    'populate[previewImage]': true,
    'populate[project_types]': true,
  }

  return await strapiGetRequest(url, params)
}

export async function getProjectTypes() {
  const url = '/api/project-types'

  return await strapiGetRequest(url)
}

export async function getProjectsPageData() {
  const url = '/api/projects-page'

  return await strapiGetRequest(url)
}

export async function getServicesData() {
  const url = '/api/services'

  return await strapiGetRequest(url)
}

export async function setContactFormData(payload: any) {
  const url = '/api/contact-form'

  const { name, email, message, document } = payload

  const formData = new FormData()

  formData.append('name', name)
  formData.append('email', email)
  formData.append('message', message)

  if (document) {
    formData.append('document', document)
  }

  return await strapiPostRequest(url, formData, null, contentType.form)
}
