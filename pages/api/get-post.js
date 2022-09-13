import { supabase } from '../../services/supabaseClient'

const getPost = async (req, res) => {
  try {
    const { data } = await supabase
      .from('feed')
      .select('*')
      .match({ id: req.query.postId })
    res.status(200).json({ data: data })
  } catch (error) {
    res.status(500)
  }
}

export default getPost

// Fazer rota API que pega somente um post, e na página post/[id].js caso não haja post tente fazer
// a requisição para o banco de dados, caso não exista (ou retorne algum erro) puxar o usuário para
// página index
