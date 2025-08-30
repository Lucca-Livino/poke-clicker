"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [clicks, setClicks] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getCurrentPokemon = () => {
    if (clicks >= 100) {
      return {
        name: "Venusaur",
        image: "/venusaur.png",
        stage: "final"
      };
    } else if (clicks >= 50) {
      return {
        name: "Ivysaur", 
        image: "/ivysaur.png",
        stage: "second"
      };
    } else {
      return {
        name: "Bulbasaur",
        image: "/bulbassauro.png", 
        stage: "first"
      };
    }
  };

  const handleBulbasaurClick = () => {
    const previousPokemon = getCurrentPokemon();
    setClicks(prev => prev + 1);
    setIsAnimating(true);
    
    const newClicks = clicks + 1;
    const newPokemon = newClicks >= 100 ? { stage: "final" } : 
                      newClicks >= 50 ? { stage: "second" } : 
                      { stage: "first" };
    
    // Animação mais curta: 600ms para evolução, 150ms para clique normal
    const animationDuration = previousPokemon.stage !== newPokemon.stage ? 600 : 150;
    
    setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);
  };

  const currentPokemon = getCurrentPokemon();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.titulo}>Pokémon Clicker</h1>
        <div className={styles.scoreBoard}>
          <h2 className={styles.scoreTitulo}>Cliques no {currentPokemon.name}</h2>
          <div className={styles.contagem}>{clicks.toLocaleString()}</div>
        </div>
        
        <div className={styles.evolutionInfo}>
          {clicks < 50 && (
            <p className={styles.nextEvolution}>
              Próxima evolução: Ivysaur em {50 - clicks} cliques
            </p>
          )}
          {clicks >= 50 && clicks < 100 && (
            <p className={styles.nextEvolution}>
              Próxima evolução: Venusaur em {100 - clicks} cliques
            </p>
          )}
          {clicks >= 100 && (
            <p className={styles.maxEvolution}>
              🌟 Evolução máxima alcançada!
            </p>
          )}
        </div>
      </div>

      <div className={styles.gameArea}>
        <button
          onClick={handleBulbasaurClick}
          className={`${styles.pokemonButton} ${isAnimating ? styles.animate : ''} ${styles[currentPokemon.stage]}`}
        >
          <Image
            src={currentPokemon.image}
            alt={currentPokemon.name}
            width={250}
            height={250}
            className={styles.pokemonImage}
          />
        </button>
      </div>

      <div className={styles.footer}>
        <p className={styles.instruction}>
          Clique no {currentPokemon.name} para ganhar pontos e evoluir!
        </p>
        
        <div className={styles.progressContainer}>
          {clicks < 100 && (
            <>
              <div className={styles.progressLabel}>
                Progresso para próxima evolução
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill}
                  style={{
                    width: `${((clicks % 50) / 50) * 100}%`
                  }}
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
