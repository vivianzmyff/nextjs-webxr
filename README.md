# Next.js React Three Fiber Tutorial

A beginner-friendly project for learning **Next.js**, **React**, and **React Three Fiber** to build interactive 3D web applications that can be deployed on **Vercel**. This project now includes **WebXR** capabilities for **AR/VR** experiences on the web.

## 🛠️ Technologies Used

| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React framework with server-side rendering | 15.5.3 |
| **React** | UI library for building components | 19.1.0 |
| **React Three Fiber** | React renderer for Three.js | Latest |
| **@react-three/drei** | Useful helpers for R3F (OrbitControls, Grid, etc.) | Latest |
| **@react-three/xr** | WebXR support for AR/VR experiences | Latest |
| **Three.js** | 3D graphics library | Latest |
| **TypeScript** | Static type checking | ^5 |
| **Tailwind CSS** | Utility-first CSS framework | ^4 |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed on your machine
- Basic knowledge of **HTML**, **CSS**, and **JavaScript**

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd next-react-three-fiber
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🥽 WebXR Features

This project now includes **WebXR** support for immersive experiences:

### **AR (Augmented Reality)**
- Click the **"Enter AR"** button to overlay 3D objects on the real world
- Requires an AR-capable device (mobile phone with AR support)
- Interact with the cube and plant using touch gestures
- The cube changes colors when tapped in AR mode

### **VR (Virtual Reality)**
- Click the **"Enter VR"** button for immersive virtual reality
- Requires a VR headset (Oculus, HTC Vive, etc.)
- Use VR controllers to interact with objects
- The potted plant can be clicked to teleport to random positions

### **Interactive Elements**
- **Cube**: Changes colors when clicked/tapped
- **Potted Plant**: Teleports to random positions when interacted with
- **Grid Floor**: Provides spatial reference in both AR and VR modes

## 🎨 Customization Ideas

Students can extend this project by:

1. **Adding More Models**: Import additional GLTF models
2. **Animation**: Use `useFrame` for continuous animations
3. **Physics**: Integrate `@react-three/cannon` for physics simulation
4. **Advanced WebXR**: Add hand tracking, anchors, and spatial mapping
5. **UI Overlays**: Create HTML overlays on top of the 3D scene
6. **Sound**: Add spatial audio with `@react-three/drei` audio components

## 🚀 Deployment to Vercel

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Visit [vercel.com](https://vercel.com)
   - Connect your GitHub repository
   - Deploy automatically with zero configuration

3. **Environment Setup:**
   - Next.js projects deploy automatically on Vercel
   - No additional configuration needed for this project

## 📚 Additional Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Drei Documentation](https://github.com/pmndrs/drei)

### Learning Materials
- [React Three Fiber Journey](https://journey.pmnd.rs/) - Comprehensive R3F course
- [Three.js Journey](https://threejs-journey.com/) - Learn Three.js fundamentals
- [Next.js Learn](https://nextjs.org/learn) - Official Next.js tutorial

### WebXR Resources
- [WebXR Device API](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API)
- [React Three XR](https://github.com/pmndrs/xr) - WebXR for React Three Fiber
- [WebXR First Steps React](https://www.youtube.com/watch?v=Q7Bx5kR7B_4) - Meta Quest tutorial