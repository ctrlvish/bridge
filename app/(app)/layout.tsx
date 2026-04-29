import TopNav from '@/components/top-nav'
import BottomNav from '@/components/bottom-nav'


export default function AppLayout({children}: {children: React.ReactNode}){
    return (
        <div>
            <TopNav />
            {children}
            <BottomNav />
        </div>
    )
}