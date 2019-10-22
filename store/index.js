import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      nextPage: null,
      postsByCategory: [],
      loadedPosts: [],
      token: null,
      items: [
        {
          text: 'home',
          to: '/'
        }
      ]
    },
    mutations: {
      setPosts (state, posts) {
        if (state.loadedPosts) {
          state.loadedPosts = [...state.loadedPosts, posts]
        }
        state.loadedPosts = posts
      },
      setNext (state, nextPage) {
        state.nextPage = nextPage
      },
      setPostsByCategory (state, posts) {
        state.postsByCategory = posts
      },
      /*addPost (state, post) {
        state.loadedPosts.push(post)
      },
      editPost (state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(
          post => post.id === editedPost.id
        )
        state.loadedPosts[postIndex] = editedPost
      },
      setToken (state, token) {
        state.token = token
      },
      clearToken (state) {
        state.token = null
      }*/
    },
    actions: {
      nuxtServerInit (vuexContext, context) {
        return context.app.$axios
          .$get(this.nextPage)
          .then(data => {
            const postsArray = []
            for (const post in data.data) {
              postsArray.push({ ...data.data[post], id: post })
            }
            vuexContext.commit('setPosts', postsArray)
            if (data['next_page_url']) {
              vuexContext.commit('setNext', data['next_page_url'])
            }
          })
          .catch(e => context.error(e))
      },
      /*addPost (vuexContext, post) {
        const createdPost = {
          ...post,
          updatedDate: new Date()
        }
        return this.$axios
          .$post(
            'https://keto-blog.firebaseio.com/posts.json?auth=' +
            vuexContext.state.token,
            createdPost
          )
          .then(data => {
            vuexContext.commit('addPost', { ...createdPost, id: data.name })
          })
          .catch(e => console.log(e))
      },*/
      /*editPost (vuexContext, editedPost) {
        return this.$axios
          .$put(
            'https://keto-blog.firebaseio.com/posts/' +
            editedPost.id +
            '.json?auth=' +
            vuexContext.state.token,
            editedPost
          )
          .then(res => {
            vuexContext.commit('editPost', editedPost)
          })
          .catch(e => console.log(e))
      },*/
      setPosts (vuexContext, posts) {
        vuexContext.commit('setPosts', posts)
      },
      /*authenticateUser (vuexContext, authData) {
        let authUrl =
          'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
          process.env.fbAPIKey
        if (!authData.isLogin) {
          authUrl =
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
            process.env.fbAPIKey
        }
        return this.$axios
          .$post(authUrl, {
            email: authData.email,
            password: authData.password,
            returnSecureToken: true
          })
          .then(result => {
            vuexContext.commit('setToken', result.idToken)
            localStorage.setItem('token', result.idToken)
            localStorage.setItem(
              'tokenExpiration',
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            )
            Cookie.set('jwt', result.idToken)
            Cookie.set(
              'expirationDate',
              new Date().getTime() + Number.parseInt(result.expiresIn) * 1000
            )
            return this.$axios.$post('http://localhost:3000/api/track-data', { data: 'Authenticated!' })
          })
          .catch(e => console.log(e))
      },
      initAuth (vuexContext, req) {
        let token
        let expirationDate
        if (req) {
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split('=')[1]
        } else if (process.client) {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log('No token or invalid token')
          vuexContext.dispatch('logout')
          return
        }
        vuexContext.commit('setToken', token)
      },
      logout (vuexContext) {
        vuexContext.commit('clearToken')
        Cookie.remove('jwt')
        Cookie.remove('expirationDate')
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('tokenExpiration')
        }
      }*/
    },
    getters: {
      postsByCategory () {
        return state.postsByCategory
      },
      loadedPosts (state) {
        return state.loadedPosts
      },
      nextPage (state) {
        return state.nextPage
      },
      isAuthenticated (state) {
        return state.token != null
      },
      categories: state => {
        const categories = []

        for (const singleNews of state.loadedPosts) {
          if (
            !singleNews.category.name ||
            categories.find(category => {
              return category.text.toLowerCase() === singleNews.category.name.toLowerCase()
            })
          ) continue

          const text = singleNews.category.name.toLowerCase()

          categories.push({
            text,
            to: `/news/${text}/`,
          })
        }
        return categories.sort().slice(0, 6)
      },
      links: (state, getters) => {
        return state.items.concat(getters.categories)
      }
    }
  })
}

export default createStore;
