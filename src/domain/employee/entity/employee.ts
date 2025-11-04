import Cpf from "../../account/vo/cpf.js"
import Name from "../../product/vo/name.js"
import UUID from "../../product/vo/uuid.js"
import Age from "../vo/age.js"
import JobTitle from "../vo/job-title.js"

export class Employee {
  private employeeId: UUID
  private name: Name
  private cpf: Cpf
  private age: Age
  private jobTitle: JobTitle

  constructor(
    employeeId: string,
    name: string,
    cpf: string,
    age: number,
    jobTitle: string
  ) {
    this.employeeId = new UUID(employeeId)
    this.name = new Name(name)
    this.cpf = new Cpf(cpf)
    this.age = new Age(age)
    this.jobTitle = new JobTitle(jobTitle)
  }

  static create(name: string, cpf: string, age: number, jobTitle: string) {
    const employeeId = UUID.create().getValue()
    return new Employee(employeeId, name, cpf, age, jobTitle)
  }

  getId() {
    return this.employeeId.getValue()
  }

  getName() {
    return this.name.getValue()
  }

  getCpf() {
    return this.cpf.getValue()
  }

  getAge() {
    return this.age.getValue()
  }

  getJobTitle() {
    return this.jobTitle.getValue()
  }
}
