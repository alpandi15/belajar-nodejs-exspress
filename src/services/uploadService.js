import tables from '#database/models'

const tbl_upload_files = tables.upload_files


export const create = async (data) => {
  const res = await tbl_upload_files.create({
    url: data?.url,
    createdBy: data?.userId
  })
  return res
}