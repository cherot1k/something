export default function ({store,redirect}) {
  if(store.getters.user == null){
    console.log('K.O')
    redirect('/?message=govno')
  }
}
