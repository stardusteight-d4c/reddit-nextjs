# Reddit Next.js | Supabase, Context API & SWR

![banner](banner.png)

> Clone the Reddit interface using `Supabase` as a backend as a service and using the `React Context API` to manage global application states such as the user session without using NextAuth.js (very common in Next.js projects). All this with super dynamic routes and real-time server responses thanks to the `SWR library`, in which the components will receive a constant and automatic stream of data updates and the user interface will always be fast and reactive. The base project was taught on the <strong>Clever Programmer</strong> channel.

:arrow_right: Supabase and Authentication <br />
:arrow_right: Supabase and API Routes <br />
:arrow_right: SWR - React Hooks for Data Fetching <br />
<br />

## Supabase and Authentication

Supabase is an `open source Firebase alternative`. Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, and Storage.

Every Supabase project comes with a full Postgres database, a free and open source database which is considered one of the world's most stable and advanced databases.

### Install Supabase as a dependency

- `npm install @supabase/supabase-js@rc`

And finally we want to save the environment variables in a `.env.local`. All we need are the `API URL` and the `anon key` that you copied earlier.

```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Now that we have the API credentials in place, let's create a helper file to initialize the `Supabase client`. These variables will be exposed on the browser, and that's completely fine since we have Row Level Security enabled on our Database.

```js
// services/supabaseClient.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

```

### Set up a Login component

Configure the `Google provider` in the Supabase dashboard itself and create a Login component:


```jsx
// components/Login.jsx

import React from 'react'
import { supabase } from '../services/supabaseClient'

// ...
const Login = () => {
  const signInWithGoogle = async () => {
    try {
      await supabase.auth.signIn({
        provider: 'google',
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={style.wrapper}>
      <img className="h-52" src="/logo.png" alt="reddit/logo" />

      <button className={style.loginBtn} onClick={signInWithGoogle}>
        <img className="w-6 h-6" src="/google.png" alt="google/logo" />
        <span className={style.loginBtnText}>Sign In with Google</span>
      </button>
    </div>
  )
}

export default Login
```

Now that we have access to the user's `metadata`, we must create a `session`, and provide the session state to the application, in this case we use the `Context API`.


```jsx
// context/RedditContext.js 

import React, { createContext, useEffect, useState } from 'react'
import { supabase } from '../services/supabaseClient'

export const RedditContext = createContext()

export const RedditProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const { user } = supabase.auth.session() || { user: null }
    setCurrentUser(user)

    // console.log(currentUser)

    supabase.auth.onAuthStateChange((_event, authSession) => {
      setCurrentUser(authSession.user)
    })
  }, [currentUser])

  return (
    <RedditContext.Provider value={{ currentUser, fetcher, selectedPost, setSelectedPost }}>
      {children}
    </RedditContext.Provider>
  )
}

```

After creating the context, we need to provide it to the application by wrapping the application `<Component />` in `pages/_app.jsx`.

```tsx
// pages/_app.tsx

import type { AppProps } from 'next/app'
import { RedditProvider } from '../context/RedditContext'
import '../styles/global.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RedditProvider>
      <Component {...pageProps} />
    </RedditProvider>
  )
}

export default MyApp
```

Finally, we need to send the user data to Supabase in the `users` table, so that we can identify their actions in the application.

```jsx
// pages/index.tsx

import { useContext, useEffect, useState } from 'react'
import { RedditContext } from '../context/RedditContext'
import { supabase } from '../services/supabaseClient'

const Home: NextPage = () => {
  const { currentUser } = useContext(RedditContext)
	
	// ... 
  useEffect(() => {
    // update or insert a new user
    if (!currentUser) return

    const saveAndUpdateUser = async () => {
      await supabase.from('users').upsert(
        {
          name: currentUser.user_metadata.full_name,
          email: currentUser.user_metadata.email,
          avatar: currentUser.user_metadata.avatar_url,
        },
        {
          onConflict: 'email',
        }
      )
    }
    saveAndUpdateUser()
  }, [currentUser])

  return (
    <>
    // ...
    <>
    
export default Home
```
*<i>supabase.com/docs/guides/with-nextjs</i>

<br />

## Supabase and API Routes

All APIs are `auto-created` from Database tables. After you have added tables or functions to your database, you can use the APIs provided.

### Creating API Routes

API routes are automatically created when you create Postgres Tables, Views, or Functions. Let's see an example:

```js
// Read all rows
let { data: feed, error } = await supabase
  .from('feed')
  .select('*')

// Read specific columns
let { data: feed, error } = await supabase
  .from('feed')
  .select('some_column,other_column')

// Read foreign tables
let { data: feed, error } = await supabase
  .from('feed')
  .select(`
    some_column,
    other_table (
      foreign_key
    )
  `)

// With pagination
let { data: feed, error } = await supabase
  .from('feed')
  .select('*')
  .range(0, 9)
```

With the very detailed Documentation of your Project's api automatically generated by Supabase, it is easy to implement API routes in any project.

```jsx
// pages/api/get-posts.js

import { supabase } from '../../services/supabaseClient'

const getPosts = async (req, res) => {
  const { data } = await supabase
    .from('feed')
    .select('*')
    .order('id', { ascending: false })

  res.status(200).json({ data: data })
}

export default getPosts
```
*<i>supabase.com/docs/guides/api</i>

<br />

## SWR - React Hooks for Data Fetching

If your page contains `frequently updating data`, and you don???t need to pre-render the data, SWR is a perfect fit and no special setup needed: just import `useSWR` and use the hook inside any components that use the data.

- First, immediately show the page without data. You can show loading states for missing data.
- Then, fetch the data on the client side and display it when ready.

This approach works well for user dashboard pages, for example. Because a dashboard is a private, user-specific page, SEO is not relevant and the page doesn???t need to be pre-rendered. The data is frequently updated, which requires request-time data fetching.

### Data Fetching with useSWR hook

For normal RESTful APIs with JSON data, first you need to create a `fetcher function`, which is just a wrapper of the native fetch:

```js
const fetcher = (...args) => fetch(...args).then(res => res.json())
```

Then you can import useSWR and start using it inside any function components:

```jsx
import useSWR from 'swr'

function Profile () {
  const { data, error } = useSWR('/api/user/123', fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  // render data
  return <div>hello {data.name}!</div>
}
```

Normally, there're 3 possible states of a request: `loading`, `ready`, or `error`. You can use the value of data and error to determine the current state of the request, and return the corresponding UI.

### Arguments

By default, `key` will be passed to `fetcher` as the argument. So the following 3 expressions are equivalent:

```js
useSWR('/api/user', () => fetcher('/api/user'))
useSWR('/api/user', url => fetcher(url))
useSWR('/api/user', fetcher)
```

### Revalidate on Interval

In many cases, data changes because of multiple devices, multiple users, multiple tabs. How can we over time update the data on screen?

SWR will give you the option to automatically refetch data. It???s smart which means refetching will only happen if the component associated with the hook is on screen.

You can enable it by setting a `refreshInterval` value:

```js
useSWR('/api/todos', fetcher, { refreshInterval: 1000 })
```

*<i>swr.vercel.app/docs</i>



