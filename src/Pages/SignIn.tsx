import { useForm } from 'react-hook-form'
import { Auth } from '../dtos/AuthDTO'
import { userService } from '../services/UserService'

export function SignIn(){  
  const { register, handleSubmit } = useForm<Auth>()
 
  async function handleLogin(userAuth: Auth) {
    try {
      await userService.authenticate(userAuth)
    } catch (error) {
      console.log(error)
    }
  }

  return ( 
    <div className="w-screen h-screen bg-black">
      <div className="max-w-sm p-4 w-full m-auto flex flex-col py-20">
        <h1 className="text-red-500 font-semibold text-4xl">Pucflix</h1>
        <form className="w-full flex flex-col gap-8 mt-16" onSubmit={handleSubmit(handleLogin)}>
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
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}