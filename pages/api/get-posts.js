import { supabase } from '../../services/supabaseClient'

const getPosts = async (req, res) => {
  const { data } = await supabase
    .from('feed')
    .select('*')
    .order('id', { ascending: false })

  res.status(200).json({ data: data })
}

export default getPosts
