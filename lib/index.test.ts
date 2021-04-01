import { ShortTree } from './index'


const stringCmp = ( a: string, b: string ) => a.localeCompare( b );

describe( "ShortTree", ( ) =>
{
	it( "should handle empty tree", ( ) =>
	{
		const tree = new ShortTree( stringCmp );
		expect( tree.values( ) ).toStrictEqual( [ ] );
	} );

	it( "should handle no chopping off", ( ) =>
	{
		const tree = new ShortTree( stringCmp );
		tree.insert( [ 'a', 'b', 'c' ] );
		tree.insert( [ 'j', 'k', 'l' ] );
		tree.insert( [ 'x', 'y', 'z' ] );
		expect( tree.values( ) ).toStrictEqual( [
			[ 'a', 'b', 'c' ],
			[ 'j', 'k', 'l' ],
			[ 'x', 'y', 'z' ],
		] );
	} );

	it( "should chop off 1 after", ( ) =>
	{
		const tree = new ShortTree( stringCmp );
		tree.insert( [ 'a', 'b', 'c' ] );
		tree.insert( [ 'j', 'k', 'l' ] );
		tree.insert( [ 'x', 'y', 'z' ] );
		tree.insert( [ 'a', 'b' ] );
		tree.insert( [ 'j', 'k' ] );
		tree.insert( [ 'x', 'y' ] );
		expect( tree.values( ) ).toStrictEqual( [
			[ 'a', 'b' ],
			[ 'j', 'k' ],
			[ 'x', 'y' ],
		] );
	} );

	it( "should chop off 2 after", ( ) =>
	{
		const tree = new ShortTree( stringCmp );
		tree.insert( [ 'a', 'b', 'c' ] );
		tree.insert( [ 'j', 'k', 'l' ] );
		tree.insert( [ 'x', 'y', 'z' ] );
		tree.insert( [ 'a' ] );
		tree.insert( [ 'j' ] );
		tree.insert( [ 'x' ] );
		expect( tree.values( ) ).toStrictEqual( [
			[ 'a' ],
			[ 'j' ],
			[ 'x' ],
		] );
	} );

	it( "should not insert when already shorter", ( ) =>
	{
		const tree = new ShortTree( stringCmp );
		tree.insert( [ 'a', 'b' ] );
		tree.insert( [ 'j' ] );
		tree.insert( [ 'x', 'y' ] );
		tree.insert( [ 'a', 'b' ] );
		tree.insert( [ 'a', 'b', 'c', 'd' ] );
		tree.insert( [ 'a', 'b', 'c' ] );
		tree.insert( [ 'a', 'b' ] );
		tree.insert( [ 'j', 'k' ] );
		tree.insert( [ 'j', 'k', 'l' ] );
		tree.insert( [ 'x', 'y', 'z' ] );
		expect( tree.values( ) ).toStrictEqual( [
			[ 'a', 'b' ],
			[ 'j' ],
			[ 'x', 'y' ],
		] );
	} );
} );
