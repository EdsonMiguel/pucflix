
import { useForm } from 'react-hook-form'
import { User } from '../dtos/UserDTO'
import { userService } from '../services/UserService'

export function SignUp(){  
  const { register, handleSubmit } = useForm<User>()
 
  async function handleLogin(user: User) {
    try {
      await userService.create(user)
      alert('Usuário cadastrado com sucesso.')
    } catch (error) {
      alert("Falha ao cadastrar usuário")
    }
  }
  return ( 
    <div className="w-screen h-screen bg-black">
      <div className="max-w-sm p-4 w-full m-auto flex flex-col py-20">
        <h1 className="text-red-500 font-semibold text-4xl">Pucflix</h1>
        <form className="w-full flex flex-col gap-8 mt-16" onSubmit={handleSubmit(handleLogin)}>
        <input 
            placeholder="Nome completo"
            {...register('nome')}
            className=" w-full text-lg p-2 bg-transparent text-white border-b focus:outline-red-500 outline-none focus:border-none rounded-sm"
          />
          <input 
            placeholder="Usuário"
            {...register('login')}
            className=" w-full text-lg p-2 bg-transparent text-white border-b focus:outline-red-500 outline-none focus:border-none rounded-sm"
          />
          <input 
            type="password" 
            placeholder="Senha"
            {...register('senha')}
            className=" w-full text-lg p-2 bg-transparent text-white border-b focus:outline-red-500 outline-none focus:border-none rounded-sm"
          />
          <button className="py-4 px-2 rounded bg-red-500 text-white mt-8">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}