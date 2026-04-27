import Question from '@/views/shopping/Question.vue'
import QuestionLoading from '@/views/shopping/QuestionLoading.vue'
import PriceCompare from '@/views/shopping/PriceCompare.vue'

export default [
    {path: '/shop/questions', component: Question},
    {path: '/shop/loading', component: QuestionLoading},
    {path: '/shop/price-compare', component: PriceCompare},
]