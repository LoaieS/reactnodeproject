import React from 'react';
import '../styles/About.css';

/**
 * About Page
 *
 */
function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">About Sharanj Forum</h2>
      
      <p className="about-paragraph">
        Welcome to the Sharanj Forum—a place for players of the Sharanj chess-roguelike game
        to come together, share strategies, and discuss all aspects of gameplay.
      </p>
      
      <p className="about-paragraph">
        Sharanj is more than just a chess variant—it’s a world where each piece can grow 
        stronger, acquire new abilities, and traverse procedurally generated dungeons.
      </p>
      
      <h3 className="about-subtitle">Our Vision</h3>
      <p className="about-paragraph">
        We believe in fostering a supportive, creative, and forward-thinking community...
      </p>
      
      <h3 className="about-subtitle">Our Team</h3>
      <p className="about-paragraph">
        We’re two dedicated developers and gaming enthusiasts...
      </p>
      
      <div className="about-team-section">
        <div className="about-member">
          <h4 className="about-member-name">Loaie Shalloufi</h4>
          <p className="about-member-role">Lead Developer</p>
          <p className="about-member-bio">
            ["I have a background in software engineering with a passion for 
            creating challenging, strategy-based games. I’ve always loved chess, 
            and combining it with roguelike mechanics was a dream come true."]
          </p>
        </div>
        
        <div className="about-member">
          <h4 className="about-member-name">Tareq Abu Yunis</h4>
          <p className="about-member-role">Co-Developer / Designer</p>
          <p className="about-member-bio">
            ["I specialize in game and system design. Chess has always been 
            a part of my life, and merging it with abilities and special elements felt like 
            the perfect way to modernize a timeless classic."]
          </p>
        </div>
      </div>
      
      <p className="about-paragraph">
        Thank you for visiting the Sharanj Forum...
      </p>
    </div>
  );
}

export default About;
