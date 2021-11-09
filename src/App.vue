<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Project LG</a>
      </div>
    </nav>
    <div class="container">
      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>
      <form @submit.prevent="salvar">
        <label>Name</label>
        <input type="text" required="required" class="form-control" placeholder="Name" v-model="project.name" >
        <label>Initial</label>
        <input type="Date"  required="required" placeholder="Initial Date" v-model="project.startDate" >
        <label>End</label>
        <input required="required" type="Date" placeholder="End Date" v-model="project.endDate" >
        <label>Value</label>
        <input required="required" type="number" step=any placeholder="Value" v-model="project.value" >
        <label>Risk</label>
        <select required="required" class="form-select" v-model="project.risk" aria-label="Default select example">
          <option selected>Open this select menu</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <br>         
        <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Initial</th>
            <th>End</th>
            <th>Value</th>
            <th>Risk</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="project of projects" :key="project.id">
            <td>{{ project.name }}</td>
            <td>{{ project.startDate }}</td>
            <td>{{ project.endDate }}</td>
            <td>{{ project.value }}</td>
            <td>{{ project.risk }}</td>
            <td>
              <button @click="editar(project)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i>Edit</button>
              <button @click="remover(project)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i> Delete</button>
              <button @click="investir(project)" data-bs-toggle="modal" data-bs-target="#exampleModal" class="waves-effect btn-small orange darken-1"><i class="material-icons">delete_sweep</i> Return on investment</button>
            </td>
          </tr>
        </tbody>      
      </table>
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Return on investment</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label>Value Project</label>
              <input type="text" class="form-control" disabled :value="this.value_project"  placeholder="Investiment " id="value_project" >
              <label>Risk Project</label>
              <input type="text" class="form-control" disabled :value="this.risk_project"  placeholder="Risk Project " id="risk_project" >
              <label>Investiment</label>
              <input type="number" step=any class="form-control" placeholder="Investiment" pattern="[0-9]+$"  v-model="investiment"  >
              <label>Return</label>
              <input type="text" class="form-control" disabled :value="this.return_project" placeholder="Return"  >
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="calcular()" >Calculate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Project from './services/project'

  export default {
    name: 'app',
    data () {
      return {
        project:{
          id: '',
          name: '',
          startDate: '',
          endDate: '',
          value: '',
          risk: ''
        },
        projects: [],
        value_project: '',
        investiment: '',
        return_project: '',
        risk_project: '',
        errors: []
      }
  },
  mounted(){
    this.listar()
  },
  methods:{    
    listar(){
      Project.listar().then(resposta => {
        this.projects = resposta.data        
      }).catch(e => {
        console.log(e)
      })
    },
    salvar(){
      if(!this.project.id){
        Project.salvar(this.project).then(resposta => {
          this.project = {}
          alert('Registered successfully!')
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }else{
        Project.atualizar(this.project).then(resposta => {
          this.project = {}
          this.errors = {}
          alert('Atualizado com sucesso!')
          this.listar()
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }      
    },
    editar(project){
      this.project = project
    },
    remover(project){
      if(confirm('Do you want to delete the project?')){
        Project.apagar(project).then(resposta => {
          this.listar()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }
    },
    investir(project){
      this.value_project = project.value
      this.risk_project = project.risk
    },
    calcular(){
      if(this.risk_project == "low"){
        this.return_project = 5 * this.investiment / 100;
       }
      if(this.risk_project == "medium"){
        this.return_project = 10 * this.investiment / 100;
      }
      if(this.risk_project == "high"){
        this.return_project = 20 * this.investiment / 100;
      } 
    }    
  }
}
</script>