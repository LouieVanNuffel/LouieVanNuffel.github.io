# SDL2 Pengo Recreation

---

For my Programming 4 course, I recreated the classic 80's arcade game **Pengo** using a **SDL2 based C++ engine**. We had to build a small game engine using **composition over inheritance** and applying several common engine patterns.  

Key patterns and systems implemented:

- **Game Loop:** start, update, late update, cleanup  
- **GameObject + Components:** entities composed of reusable components  
- **Subject-Observer:** events for character actions and UI updates  
- **Command-Action Bindings:** input-driven actions for players and AI  
- **State/Animator:** animation states driven by events  
- **Service Locator & Sound System:** threaded sound queue via service locator  
- **Singletons:** collision system, input manager, time tracking, game state  
- **Additional Functionality:** `OnDestroy()` for cleanup, `OnCollisionEnter()` for collision handling  

The levels are loaded from binary files.

[<img src="../assets/images/icons/github.png" alt="github" class="link-button">](https://github.com/LouieVanNuffel/Programming-4-Minigin.git)

<div class="video-wrapper">
  <iframe src="https://www.youtube.com/embed/NZoky6Q10fo" title="SDL Pengo Gameplay" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

---

## My Takeaways

It was very insightful to create my own engine using patterns utilized by many mainstream engines such as unity. I believe this project honed my C++ skills and gave me a much deeper understanding of game engines and game design.

---

## Tools and Languages Used

**C++**, **SDL2**, **Visual Studio**, **XInput**

---
