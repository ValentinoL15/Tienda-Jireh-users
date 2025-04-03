import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../static-components/header/header.component";
import { MegaMenu } from 'primeng/megamenu';
import { Tag } from 'primeng/tag';
import { Product } from '../../interfaces/interfaces';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, MegaMenu,Tag],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit{
  items: any[] | undefined;
  products!: Product[]
  
  ngOnInit(): void {
    this.items = [
      {
          label: 'Adidas',
          items: [
              [
                  {
                      label: 'Hombres',
                  },
              ],
              [
                {
                    label: 'Mujeres',
                },
              ],
              [
                {
                    label: 'Niños',
                    
                },
                {
                    label: 'Niñas',
                    
                },
            ],
          [
            {
                label: 'Unisex',
            },
        ],
          ],
      },
      {
        label: 'Nike',
        items: [
            [
                {
                    label: 'Hombres',
                },
            ],
            [
              {
                  label: 'Mujeres',
              },
            ],
            [
              {
                  label: 'Niños',
                  
              },
              {
                  label: 'Niñas',
                  
              },
          ],
        [
          {
              label: 'Unisex',
          },
      ],
        ],
    },
    {
      label: 'Dolce&Gabbana',
      items: [
          [
              {
                  label: 'Hombres',
              },
          ],
          [
            {
                label: 'Mujeres',
            },
          ],
          [
            {
                label: 'Niños',
                
            },
            {
                label: 'Niñas',
                
            },
        ],
      [
        {
            label: 'Unisex',
        },
    ],
      ],
  },
  {
    label: 'Reebok',
    items: [
        [
            {
                label: 'Hombres',
            },
        ],
        [
          {
              label: 'Mujeres',
          },
        ],
        [
          {
              label: 'Niños',
              
          },
          {
              label: 'Niñas',
              
          },
      ],
    [
      {
          label: 'Unisex',
      },
  ],
    ],
},
{
  label: 'Under Armour',
  items: [
      [
          {
              label: 'Hombres',
          },
      ],
      [
        {
            label: 'Mujeres',
        },
      ],
      [
        {
            label: 'Niños',
            
        },
        {
            label: 'Niñas',
            
        },
    ],
  [
    {
        label: 'Unisex',
    },
],
  ],
},
{
  label: 'Diesel',
  items: [
      [
          {
              label: 'Hombres',
          },
      ],
      [
        {
            label: 'Mujeres',
        },
      ],
      [
        {
            label: 'Niños',
            
        },
        {
            label: 'Niñas',
            
        },
    ],
  [
    {
        label: 'Unisex',
    },
],
  ],
},
{
  label: 'lecog Sport',
  items: [
      [
          {
              label: 'Hombres',
          },
      ],
      [
        {
            label: 'Mujeres',
        },
      ],
      [
        {
            label: 'Niños',
            
        },
        {
            label: 'Niñas',
            
        },
    ],
  [
    {
        label: 'Unisex',
    },
],
  ],
},
  ];
}
}
