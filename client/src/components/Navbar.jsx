import { Video } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 glass">
      <div className="flex items-center gap-3">
        <Video className="text-cyan-400" />
                

        <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          MeetX
        </h1>
      </div>
    </nav>
  )
}

export default Navbar