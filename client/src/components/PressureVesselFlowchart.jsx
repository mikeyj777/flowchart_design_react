import React, { useState } from 'react';

const styles = {
  flowchartContainer: {
    maxWidth: '1152px',
    margin: '0 auto',
    padding: '32px',
    backgroundColor: '#f9fafb',
    borderRadius: '16px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '32px',
    textAlign: 'center',
    backgroundImage: 'linear-gradient(to right, #2563eb, #7c3aed)',
    WebkitBackgroundClip: 'text',
    color: 'transparent'
  },
  node: {
    padding: '16px',
    borderRadius: '12px',
    borderWidth: '2px',
    transition: 'all 0.3s',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    position: 'relative',
    cursor: 'pointer',
    margin: '10px',
    transform: 'scale(1)',
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '32px'
  },
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: '24px',
    height: '24px',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round'
  },
  connecting: {
    margin: '16px auto',
    textAlign: 'center'
  }
};

// Node type styles
const nodeTypes = {
  warning: { backgroundColor: '#fee2e2', borderColor: '#ef4444' },
  decision: { backgroundColor: '#dbeafe', borderColor: '#3b82f6' },
  phase: { backgroundColor: '#f3e8ff', borderColor: '#8b5cf6' },
  outcome: { backgroundColor: '#dcfce7', borderColor: '#22c55e' }
};

const CustomIcon = ({ type }) => {
  const icons = {
    alert: (
      <svg viewBox="0 0 24 24" style={styles.icon}>
        <path d="M12 9v4M12 17h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    droplet: (
      <svg viewBox="0 0 24 24" style={styles.icon}>
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
      </svg>
    ),
    wind: (
      <svg viewBox="0 0 24 24" style={styles.icon}>
        <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
      </svg>
    ),
    branch: (
      <svg viewBox="0 0 24 24" style={styles.icon}>
        <path d="M6 3v12m0 0a3 3 0 103 3m-3-3a3 3 0 013 3m6-14a3 3 0 100 6 3 3 0 000-6z" />
      </svg>
    ),
    arrow: (
      <svg viewBox="0 0 24 24" style={styles.icon}>
        <path d="M12 5v14m0 0l-7-7m7 7l7-7" />
      </svg>
    )
  };
  return icons[type];
};

const FlowNode = ({ children, type = 'default', isHighlighted = false, onClick }) => (
  <div 
    style={{
      ...styles.node,
      ...nodeTypes[type],
      ...(isHighlighted && { boxShadow: '0 0 0 4px #93c5fd' })
    }}
    onClick={onClick}
  >
    {children}
  </div>
);

const ConnectingLine = ({ isAnimated = false }) => (
  <div style={styles.connecting}>
    <CustomIcon type="arrow" />
  </div>
);

const PressureVesselFlowchart = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  return (
    <div style={styles.flowchartContainer}>
      <h2 style={styles.title}>Pressure Vessel Analysis Flowchart</h2>

      {/* Start Node */}
      <div style={styles.flexCenter}>
        <FlowNode 
          type="warning" 
          isHighlighted={selectedNode === 'start'}
          onClick={() => setSelectedNode('start')}
        >
          <div style={styles.flexCenter}>
            <CustomIcon type="alert" />
            <span style={{marginLeft: '8px'}}>Overpressure Analysis</span>
          </div>
        </FlowNode>
      </div>

      <ConnectingLine isAnimated={true} />

      {/* Decision Node */}
      <div style={styles.flexCenter}>
        <FlowNode 
          type="decision"
          isHighlighted={selectedNode === 'pressure'}
          onClick={() => setSelectedNode('pressure')}
        >
          Terminal Pressure?
        </FlowNode>
      </div>

      <ConnectingLine />

      {/* Three Branches */}
      <div style={styles.grid}>
        {/* Left Branch */}
        <div style={styles.flexCenter}>
          <div>
            <div style={{textAlign: 'center', marginBottom: '8px'}}>1.0-1.3</div>
            <FlowNode 
              type="outcome"
              isHighlighted={selectedNode === 'safe'}
              onClick={() => setSelectedNode('safe')}
            >
              <div>
                <div style={{fontWeight: 'bold'}}>No Vessel Leak Concern</div>
                <div style={{fontSize: '14px', color: '#4b5563'}}>Evaluate Relief Effluent</div>
              </div>
            </FlowNode>
          </div>
        </div>

        {/* Middle Branch */}
        <div style={styles.flexCenter}>
          <div>
            <div style={{textAlign: 'center', marginBottom: '8px'}}>1.3-2×MAWP</div>
            <FlowNode 
              type="outcome"
              isHighlighted={selectedNode === 'leak'}
              onClick={() => setSelectedNode('leak')}
            >
              <div>
                <div style={{fontWeight: 'bold'}}>1/2" Leak</div>
                <div style={{fontSize: '14px', color: '#4b5563'}}>Elev - BTM of vessel</div>
              </div>
            </FlowNode>
          </div>
        </div>

        {/* Right Branch */}
        <div style={styles.flexCenter}>
          <div>
            <div style={{textAlign: 'center', marginBottom: '8px'}}>{'>'}2×MAWP</div>
            <FlowNode 
              type="phase"
              isHighlighted={selectedNode === 'phase'}
              onClick={() => setSelectedNode('phase')}
            >
              <div style={styles.flexCenter}>
                <CustomIcon type="branch" />
                <span style={{marginLeft: '8px'}}>Phase Analysis</span>
              </div>
            </FlowNode>

            <ConnectingLine isAnimated={selectedNode === 'phase'} />

            <div style={styles.grid}>
              <FlowNode 
                type="phase"
                isHighlighted={selectedNode === 'liquid'}
                onClick={() => setSelectedNode('liquid')}
              >
                <div>
                  <div style={styles.flexCenter}>
                    <CustomIcon type="droplet" />
                  </div>
                  <div style={{fontWeight: 'bold', fontSize: '14px'}}>Liquid Phase</div>
                  <div style={{fontSize: '12px', color: '#4b5563'}}>Fill Rate</div>
                  <div style={{fontSize: '12px', color: '#4b5563'}}>Elev - BTM of vessel</div>
                </div>
              </FlowNode>

              <FlowNode 
                type="phase"
                isHighlighted={selectedNode === 'vapor'}
                onClick={() => setSelectedNode('vapor')}
              >
                <div>
                  <div style={styles.flexCenter}>
                    <CustomIcon type="wind" />
                  </div>
                  <div style={{fontWeight: 'bold', fontSize: '14px'}}>Vapor Phase</div>
                  <div style={{fontSize: '12px', color: '#4b5563'}}>Catastrophic Rupture</div>
                  <div style={{fontSize: '12px', color: '#4b5563'}}>Elev - BTM of vessel</div>
                </div>
              </FlowNode>

              <div>
                <FlowNode 
                  type="phase"
                  isHighlighted={selectedNode === 'twophase'}
                  onClick={() => setSelectedNode('twophase')}
                >
                  <div style={{fontSize: '14px'}}>Two-Phase Flow</div>
                </FlowNode>

                <ConnectingLine isAnimated={selectedNode === 'twophase'} />

                <FlowNode 
                  type="outcome"
                  isHighlighted={selectedNode === 'calculation'}
                  onClick={() => setSelectedNode('calculation')}
                >
                  <div style={{fontSize: '12px'}}>
                    <div>{'< 95% LL by vol:'}</div>
                    <div style={{fontWeight: 'bold'}}>Use Input Rate</div>
                    <div>{'≥ 95% LL by vol:'}</div>
                    <div style={{fontWeight: 'bold'}}>Calc Based on LL</div>
                  </div>
                </FlowNode>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{marginTop: '48px', borderTop: '1px solid #e5e7eb', paddingTop: '24px'}}>
        <h3 style={{fontWeight: 'bold', marginBottom: '16px', color: '#374151'}}>Legend:</h3>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center'}}>
          <FlowNode type="decision">Decision Point</FlowNode>
          <FlowNode type="phase">Phase Analysis</FlowNode>
          <FlowNode type="outcome">Outcome</FlowNode>
          <FlowNode type="warning">Warning</FlowNode>
        </div>
      </div>
    </div>
  );
};

export default PressureVesselFlowchart;