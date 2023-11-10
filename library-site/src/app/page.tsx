'use client';

import React, { ReactElement } from 'react';
import Container from '@/component/container';

export default function Home(): ReactElement {
  return (
    <div className="flex flex-col gap-8">
      <Container className="flex flex-col gap-4" title="Bienvenue !">
        <div className="flex flex-col gap-2">
          <span className="font-medium">
            Voici notre projet de gestionnaire de livre
          </span>
          <span className="italic">
            Vous pouvez naviguer dans le menu de gauche pour accéder aux
            différentes pages.
          </span>
        </div>
      </Container>
      <Container className="flex flex-col gap-4" title="A propos de nous">
        <div className="flex flex-col gap-2">
          <span className="font-medium">Back end</span>
          <div className="flex flex-col text-sm italic">
            <span>Nicolas BROAGE</span>
            <span>Mael MONTEIL</span>
            <span>Thomas VIGNERON</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-medium">Front end</span>
          <div className="flex flex-col text-sm italic">
            <span>Antoine MAES</span>
          </div>
        </div>
      </Container>
    </div>
  );
}
