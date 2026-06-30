'use client'
import { useState } from "react"
import Link from "next/link"

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  return (
    <nav>
      <Link href="/">MyPokéCollection</Link>
      <Link href="/explore">Explore Cards</Link>
      <Link href="/create">Create Custom Card</Link>
      <form>
        <input type='text' placeholder='Search Pokémon...' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <button type='submit'>
            {/* To be swapped out with a Poké ball icon later */}
            {isSearching ? '🌀' : '🔍'}
          </button>
      </form>
    </nav>
  )
}

export default Navbar