import Pairing from '@/views/pairing/Pairing.vue'
import PairingLoading from '@/views/pairing/PairingLoadingView.vue'

export default [
    {path: '/pairing/:type', component: Pairing},
    {path: '/pairing/loading', component: PairingLoading},
]