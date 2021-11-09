import { http } from './config'

export default	{

  salvar:(project)=>{
	return http.post('project',project);
  },
    
  atualizar:(project)=>{
	return http.put('project',project);
  },

  listar:()=>{
	return http.get('projects')
  },
    
  apagar:(project)=>{
	return http.delete('project', { data: project })
  }
}