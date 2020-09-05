interface ITemplateVariables {
  [key: string]: string | number
}

interface IMailTemplateParserDTO {
  file: string
  varibales: ITemplateVariables
}

export default IMailTemplateParserDTO
