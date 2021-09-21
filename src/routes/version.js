import project from '../../config/project.config'

const apiVersion = project?.api_version ? `/${project?.api_version}` : ''

export {
  apiVersion
}
