interface ITemplateVariables {
  [key: string]: string | number
}

interface IMailTemplateParserDTO {
  template: string
  varibales: ITemplateVariables
}

export default IMailTemplateParserDTO
