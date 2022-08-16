import { supabase } from '../../services/supabaseClient'

const getComments = async (req, res) => {
  try {
    // console.log(req.query)

    const { data } = await supabase
      .from('comments')
      .select('*, users!inner(*)')
      .eq('postId', req.query.postId)

    res.status(200).send({ data: data })
  } catch (error) {
    res.status(500).send({ error: 'Error fetching comments' })
  }
}

export default getComments
